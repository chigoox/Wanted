import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { collection, arrayUnion, arrayRemove, increment, deleteDoc, doc, setDoc, getDocs, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { AUTH, DATABASE, STORAGE } from '../config/Firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export function handleInput5(key, value, stateSetter) {
    //const key = target.name
    // const value = target.value


    try {
        stateSetter((old) => {
            return { ...old, [key]: value }
        })
    } catch {
        if (!stateSetter) {
            console.log('need stateSetter')
        }
    }

}


export async function addUserInfoToDatabase(data, user) {
    const docRef = doc(DATABASE, "Users", `${user.email}${user.uid}`)
    await setDoc(docRef, data, { merge: true });

}

export async function addAdminInfoToDatabase(data, collection, document) {


    const docRef = doc(DATABASE, collection, document)
    await setDoc(docRef, data, { merge: true });

}

async function updateuserDataArray(data, from, remove = true) {
    const docRef = doc(DATABASE, "Users", `${user.email}${user.uid}`)

    if (remove == false) {
        await updateDoc(docRef, {
            [from]: arrayUnion(data)
        });
    } else {
        await updateDoc(docRef, {
            [from]: arrayRemove(data)
        });
    }

}

export function getSignedInUser(setUser, SetData, setCARTTOTAL, userData) {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            fetchData(SetData, user)
            if (setCARTTOTAL) setCARTTOTAL(userData?.CartTotal)

        } else {
            // User is signed out
            // ...
        }
    });
}

async function deleteUserData(user, cartItem) {
    const userData = doc(DATABASE, 'Users', `${user?.email}${user.uid}`);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        [`Cart.${cartItem}`]: deleteField()
    });

}


async function deleteUserCart(user) {
    const userData = doc(DATABASE, 'Users', `${user?.email}${user.uid}`);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        Cart: deleteField(),
        CartTotal: deleteField()
    });

}

async function deleteUserData5(user, data) {
    const userData = doc(DATABASE, 'Users', `${user?.email}${user.uid}`);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        [data]: deleteField()
    });

}

async function deleteAdminData5(collection, Doc, field) {
    const userData = doc(DATABASE, collection, Doc);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        [field]: deleteField()
    });

}



async function decreaseCartAmount(user, price, cartTotal) {
    const docRef = doc(DATABASE, "Users", `${user?.email}${user.uid}`)
    const data = { CartTotal: (price && price > 0) ? increment(-1 * price) : increment(0) }
    console.log(cartTotal)
    // Remove the 'capital' field from the document
    await setDoc(docRef, data, { merge: true });
    if (cartTotal == 0 || cartTotal < 0) await updateDoc(docRef, { "CartTotal": 0, }, { merge: true })
}









function getZipInfo(zip, set) {
    let responseClone
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            set(data)
        }, function (rejectionReason) { // 3
            //console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
                .then(function (bodyText) {
                    //console.log('Received the following instead of valid JSON:', bodyText); // 6
                });
        });
}

export const getRand = (max) => { return Math.floor(Math.random() * max) + 1; }


async function fetchProducts(setProducts) {
    const querySnapshot = await getDocs(collection(DATABASE, "Products"));
    querySnapshot.forEach((doc) => {
        setProducts((old) => {
            return ({
                ...old, [doc.id]: doc.data()
            })
        })

    });
}
async function fetchData(setUserData, user) {
    const docRef = doc(DATABASE, 'Users', `${user.email}${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setUserData(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }


}

async function fetchDocument(collection, document, setterfunction) {
    const docRef = doc(DATABASE, collection, document);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setterfunction(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function fetchAppointments(setAppointmentData, x) {
    const docRef = doc(DATABASE, 'Appointments', 'Appointments');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setAppointmentData(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function fetchAva(setAva, setApts) {
    const docRef = doc(DATABASE, 'Appointments', 'Availability');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setAva(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }


}

export { fetchDocument, deleteUserCart, deleteAdminData5, deleteUserData5, fetchAppointments, fetchProducts, fetchAva, fetchData, deleteUserData, updateuserDataArray, decreaseCartAmount, getZipInfo }