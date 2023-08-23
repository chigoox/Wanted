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


function getDay() {
    const date = new Date();
    const day = date.getDay();

    return (day)
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
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
export async function addUserInfoToDatabase(data, uid) {
    const docRef = doc(DATABASE, "Users", `${uid}`)
    await setDoc(docRef, data, { merge: true });

}
async function DeleteTask(user, Task, tasktype = 'allTask') {
    const userData = doc(DATABASE, 'Users', `${user.uid}`);
    // Remove the 'capital' field from the document
    if (tasktype == 'allTask') {
        await updateDoc(userData, {
            [`Task.allTasks.${Task}`]: deleteField()
        });
    }
    if (tasktype == 'currentTask') {
        await updateDoc(userData, {
            [`Task.currentTask.${data}`]: deleteField()
        });
    }

}

async function UpdateTask(user, Task) {
    const TasksData = doc(DATABASE, "Users", `${user.uid}`);
    await setDoc(TasksData, {
        Task: {
            allTasks: {
                [Task.task]: Task
            }
        }
    });


}




async function DeleteTask1(user, data) {
    const userData = doc(DATABASE, 'Users', `${user.uid}`);
    // Remove the 'capital' field from the document
    await updateDoc(userData, {
        [`Task.currentTask.${data}`]: deleteField()
    });

}





export const getRand = (max) => { return Math.floor(Math.random() * max); }



const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return (month + '-' + date);
    // You can turn it in to your desired format
}






export { shuffle, getDay, getCurrentDate, fetchDocument, DeleteTask, UpdateTask }