import functions = require("firebase-functions");
import admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

function countByField(
  snapshot: admin.firestore.QuerySnapshot<admin.firestore.DocumentData>,
  field: string
) {
  const counts: { [fieldName: string]: number } = {};
  snapshot.docs.map((doc) => {
    const fieldName = doc.get(field);
    if (fieldName in counts) {
      counts[fieldName] += 1;
    } else {
      counts[fieldName] = 1;
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
    const counts = countByField(snapshot, "trait");
    functions.logger.info(counts);

    // write counts to the firestore
    const batch = db.batch();
    const countCollection = db.collection("comments-count");
    Object.entries(counts).forEach(([id, count]) => {
      batch.set(countCollection.doc(id), { count: count }, { merge: true });
    });
    await batch.commit();

    functions.logger.info("updated comments-count");
    // return counts back to the app
    return counts;
  });
