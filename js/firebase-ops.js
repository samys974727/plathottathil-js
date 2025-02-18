// Initialize Firebase (same config as in index.html)
const firebaseConfig = {
    // Your Firebase config object here
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Billing functions
async function saveBill(billData) {
    try {
        const docRef = await db.collection('bills').add({
            ...billData,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { status: 'success', billId: docRef.id };
    } catch (error) {
        console.error('Error saving bill:', error);
        throw error;
    }
}

// Get all bills
async function getBills() {
    try {
        const snapshot = await db.collection('bills')
            .orderBy('timestamp', 'desc')
            .get();
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting bills:', error);
        throw error;
    }
}

// Add more functions as needed... 