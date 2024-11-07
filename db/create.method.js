const { doc, setDoc } = require("firebase/firestore");
const { db } = require("./firebase-config");

const uploadProcessedData = async ({
  document_name,
  document_id,
  document_data,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const document = doc(db, document_name, document_id);
      await setDoc(document, document_data);
      resolve({
        status: 200,
        message: "Data uploaded successfully",
      });
    } catch (error) {
      console.log(document_name, " : ", error);
      reject({
        status: error.status || 500,
        message: error.message,
      });
    }
  });

module.exports = {
  uploadProcessedData,
};
