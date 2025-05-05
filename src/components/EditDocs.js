/* import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    updateDoc,
    collection,
    doc,
    onSnapshot
} from 'firebase/firestore';
export default function EditDocs({
    database
}) {
    const isMounted = useRef()
    const collectionRef = collection(database, 'docsData')
    let params = useParams();
    const [documentTitle, setDocumentTitle] = useState('')
    const [docsDesc, setDocsDesc] = useState('');
    const getQuillData = (value) => {
        setDocsDesc(value)
    }
    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            })
                .then(() => {
                    toast.success('Document Saved', {
                        autoClose: 2000
                    })
                })
                .catch(() => {
                    toast.error('Cannot Save Document', {
                        autoClose: 2000
                    })
                })
        }, 1500)
        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title)
            setDocsDesc(docs.data().docsDesc);
        })
    }

    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])
    return (
        <div className='editDocs-main'>
            <ToastContainer />
            <h1>{documentTitle}</h1>
            <div className='editDocs-inner'>
                <ReactQuill
                    className='react-quill'
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>
        </div>
    )
}*/
import './EditDocs.css';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { auth } from '../firebaseConfig';

export default function EditDocs({ database }) {
  const isMounted = useRef();
  const collectionRef = collection(database, 'docsData');
  let params = useParams();

  const [documentTitle, setDocumentTitle] = useState('');
  const [docsDesc, setDocsDesc] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params.id);
      updateDoc(document, {
        docsDesc: docsDesc,
      })
        .then(() => {
          toast.success('Document Saved', {
            autoClose: 2000,
          });
        })
        .catch(() => {
          toast.error('Cannot Save Document', {
            autoClose: 2000,
          });
        });
    }, 1500);

    return () => clearTimeout(updateDocsData);
  }, [docsDesc]);

  const getData = () => {
    const document = doc(collectionRef, params.id);
    onSnapshot(document, (docs) => {
      setDocumentTitle(docs.data().title);
      setDocsDesc(docs.data().docsDesc);
    });
  };

  // 👇 Track collaborators by updating timestamp every 3s
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const collabRef = doc(database, `docsData/${params.id}/collaborators/${user.uid}`);

    const interval = setInterval(() => {
      setDoc(collabRef, {
        userName: user.email,
        timestamp: Date.now(),
      });
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, [database, params.id]);

  // 👇 Listen for active collaborators
  useEffect(() => {
    const collabCollectionRef = collection(database, `docsData/${params.id}/collaborators`);

    const unsub = onSnapshot(collabCollectionRef, (snapshot) => {
      const now = Date.now();
      const active = snapshot.docs
        .map((doc) => doc.data())
        .filter((user) => now - user.timestamp < 10000); // show users active in last 10 seconds
      setCollaborators(active);
    });

    return () => unsub();
  }, [database, params.id]);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    getData();
  }, []);

  return (
    <div className='editDocs-main'>
      <ToastContainer />
      <h1>{documentTitle}</h1>
      <div className='editDocs-inner'>
        <ReactQuill
          className='react-quill'
          value={docsDesc}
          onChange={getQuillData}
        />
      </div>

      {/* 👇 Active collaborators list */}
      <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f3f3f3', borderRadius: '6px' }}>
        <strong>Active Collaborators:</strong>
        <ul>
          {collaborators.map((user, index) => (
            <li key={index}>{user.userName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
