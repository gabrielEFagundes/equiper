import { useEffect, useState } from "react";
import './UserGenerator.css';

export default function UserGenerator(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const [gender, setGender] = useState("mixed");

    const fetchUsers = async () => {
        setLoading(true)
        try{
            const response = await fetch(`https://randomuser.me/api/?results=5&gender=${gender}`);
            const data = await response.json();

            setUsers(data.results);
            setCounter(counter+5);
        }catch(e){
            throw Error("Couldn't fetch users: " + e);
        }finally{
            setLoading(false);
        }
    }

    const selectGender = (e) => {
        setGender(e.target.value);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <>
            <div className="user-container">
                <header className="user-header">
                    <h2>Equiper</h2>
                    <p className="found-talents">Found Talents: {counter}</p>
                    <button 
                    onClick={fetchUsers} 
                    disabled={loading}
                    className="refresh-button"
                    >
                        {loading ? 'Fetching...' : 'Generate'}
                    </button>
                </header>

                <div className="user-grid">
                {loading ? (
                <p className="loading-text">Loading new equip members...</p>
                ) : (
                users.map((user) => (
                <div key={user.login.uuid} className={user.dob.age > 50 ? "user-card special" : "user-card"}>
                    <img src={user.picture.medium} alt={user.name.first} />
                    <div className="user-info">
                        <strong>{user.name.first} {user.name.last}</strong>
                        <p>{user.dob.age > 50 ? "💫 Senior" : "Young Talent"}</p>
                        <p>{user.email}</p>
                        <span>📍 {user.location.city}, {user.location.country}</span>
                    </div>
                </div>
                )))}
                </div>
                <div className="container">
                    <select name="gender" onChange={selectGender}>
                        <option value="mixed">Mixed</option>
                        <option value="male">Male Talents</option>
                        <option value="female">Female Talents</option>
                    </select>
                </div>
            </div>
        </>
    )
}