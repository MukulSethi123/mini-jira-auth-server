module.exports = function getSpecificDocument(collectionRef, docId) {
  return collectionRef
    .doc(docId)
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        return docSnapshot.data();
      } else {
        return null; // Document not found
      }
    })
    .catch((err) => {
      console.log(err);
      throw err; // Re-throw the error to be handled by the caller
    });
};
