
"use client"
import { useEffect, useState } from "react";
import NewCar from "../app/components/NewCar/NewCar.jsx";

export default function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/cars");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddCar=(newCar)=>{
        setItems([...items,newCar]);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
        <ul>
            {items.map((item) => (
                <li key={item._id || Math.random()} >{item.color} {item.model}</li>
            ))}
        </ul>

        <h2>Add a new car</h2>
        <NewCar onAddCar={handleAddCar} />
        </div>
    );
    }