const {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
} = require("firebase/firestore");
const { db } = require("./firebase-config");

const getAllDataOfCollection = async ({ document_name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const collectionRef = collection(db, document_name);
      const finalData = [];

      const q = query(collectionRef);

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        finalData.push(doc.data());
      });

      resolve({
        status: 200,
        message: "Data retrieved successfully",
        data: finalData,
      });
    } catch (error) {
      reject({
        status: error.status || 500,
        message: error.message,
      });
    }
  });

const getByDocument = async ({ collection_name, document_name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, collection_name, document_name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve({
          status: 200,
          message: "Document data retrieved successfully",
          data: docSnap.data(),
        });
      } else {
        reject({
          status: 404,
          message: "Not found",
        });
      }
    } catch (error) {
      reject({
        status: error.status || 500,
        message: error.message,
      });
    }
  });

module.exports = {
  getAllDataOfCollection,
  getByDocument,
};
