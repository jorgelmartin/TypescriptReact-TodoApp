import { Routes, Route, Navigate } from "react-router-dom";
import { TodosUser } from "../TodosUser/TodosUser";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>} />
                <Route path="/" element={<TodosUser />} />
                <Route path="/Todos" element={<TodosUser />} />
            </Routes>
        </>
    );
};