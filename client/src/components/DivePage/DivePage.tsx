import React, { useEffect, useState, createContext } from 'react';
import styles from './DivePage.module.sass';
import DiveCard from './DiveCard';
import { FaPlus } from 'react-icons/fa';

type Props = {};
type Dive = { id: string, name: string, color: string, popularity: number }
export const DiveContext = createContext({
    currentUserId: "",
    setCurrentUserId: (id: string) => { id }
});

const DivePage: React.FC = (props: Props) => {
    const [currentUserId, setCurrentUserId] = useState("");
    const [dives, setDives] = useState<Array<Dive>>([]);
    const contextValue = {currentUserId, setCurrentUserId};

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/current_user", {
                    credentials: "include",
                    method: "GET"
                });
                const responseJson = await response.json();
                setCurrentUserId(responseJson["id"])
            } catch {
                console.error("ERROR: Unable to read current user from session.");
            }
        };

        getCurrentUser();
    }, []);

    useEffect(() => {
        const updateCurrentUser = async () => {
            try {
                await fetch("http://127.0.0.1:5000/api/set_current_user", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    mode: "cors",
                    body: JSON.stringify({ user_id: currentUserId })
                });
            } catch {
                console.error("ERROR: Unable to set current user in session.");
            }
        };
        const getDives = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/get_current_dives", {
                    credentials: "include",
                    method: "GET",
                });
                const responseJson = await response.json();
                setDives(responseJson["dives"]);
            } catch {
                console.error("ERROR: Unable to read user dives from session.");
            }
        };

        if (currentUserId != "") {
            updateCurrentUser();
            getDives();
        }
    }, [currentUserId]);

    const createDive = async () => {
        const bodyJson = {
            user_id: currentUserId,
            name: "Test Dive",
            base_song_ids: []
        }
        try {
            const response = await fetch("http://127.0.0.1:5000/api/create_dive", {
                credentials: "include",
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                mode: "cors",
                body: JSON.stringify(bodyJson)
            });
            const dive = await response.json();
            setDives(dives.concat(dive["dive"]));
        } catch {
            console.error("ERROR: Unable to create dive in session.");
        }
    };

    const deleteDive = async (id: string) => {
        try {
            await fetch("http://127.0.0.1:5000/api/delete_dive", {
                credentials: "include",
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                mode: "cors",
                body: JSON.stringify({ user_id: currentUserId, dive_id: id})
            });
            for (let i = 0; i < dives.length; ++i) {
                if (dives[i].id == id) {
                    const d = Array.from(dives);
                    d.splice(i, 1);
                    setDives(d);
                    break;
                }
            }
        } catch {
            console.error("ERROR: Unable to delete dive in session.");
        }
    };

    return (
        <DiveContext.Provider value={contextValue}>
            <div className={styles.page}>
                {dives.map(d => <DiveCard deleteDive={deleteDive} id={d.id} name={d.name} color={d.color}/>)}
                <div className={styles.createDiveContainer}>
                    <button className={styles.createDiveBtn} onClick={createDive}>
                        <FaPlus />
                    </button>
                </div>
            </div>
        </DiveContext.Provider>
    );
};

export default DivePage;