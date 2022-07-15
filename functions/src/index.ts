import functions = require("firebase-functions");
import admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

function countByTrait(
  snapshot: admin.firestore.QuerySnapshot<admin.firestore.DocumentData>
) {
  const counts: {
    [fieldName: string]: { "+"?: number; "-"?: number };
  } = {};
  snapshot.docs.map((doc) => {
    const fieldName = doc.get("trait");
    const tone = doc.get("tone") as "+" | "-";

    if (fieldName in counts) {
      if (tone in counts[fieldName]) {
        counts[fieldName][tone]! += 1;
      } else {
        counts[fieldName][tone] = 1;
      }
    } else {
      counts[fieldName] = {
        [tone]: 1,
      };
    }
  });
  return counts;
}

/* https://medium.com/firebase-tips-tricks/how-to-count-documents-in-firestore-a0527f792d04 */
export const setCountComments = functions
  .region("australia-southeast1")
  .https.onCall(async (_data, _context) => {
    // count all comments
    const query = db.collection("comments");
    const snapshot = await query.get();
    const counts = countByTrait(snapshot);
    functions.logger.info(counts);

    // write counts to the firestore
    const batch = db.batch();
    const countCollection = db.collection("comments-count");
    Object.entries(counts).forEach(([trait, count]) => {
      const total = (count["+"] || 0) + (count["-"] || 0);
      batch.set(
        countCollection.doc(trait),
        { trait: trait, total: total },
        { merge: true }
      );
    });
    await batch.commit();

    functions.logger.info("updated comments-count");
    // return counts back to the app
    return counts;
  });
