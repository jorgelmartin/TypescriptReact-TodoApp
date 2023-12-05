import { Routes, Route, Navigate } from "react-router-dom";
import { TodosUser } from "../TodosUser/TodosUser";
// import { Home } from "../Home/Home";


export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>} />
                <Route path="/" element={<TodosUser />} />
                <Route path="/Todos" element={<TodosUser />} />
                {/* <Route path="/register" element={<Register />} /> 
                <Route path="/profile" element={<Profile />} /> 
                <Route path="/admin" element={<Admin />} /> 
                <Route path="/users" element={<Users />} /> 
                <Route path="/convocation" element={<Convocation />} /> 
                <Route path="/createConvocation" element={<CreateConvocation />} /> 
                <Route path="/convodetail/:id" element={<ConvocationDetail />} /> 
                <Route path="/student" element={<Student />} /> 
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/userReq" element={<UserRequests />} /> 
                <Route path="/myPrograms" element={<MyPrograms />} /> 
                <Route path="/programDetail/:id" element={<ProgramDetail />} /> 
                <Route path="/requestAccepted" element={<RequestAccepted />} /> 
                <Route path="/forum" element={<Forum />} />  */}
            </Routes>
        </>
    );
};