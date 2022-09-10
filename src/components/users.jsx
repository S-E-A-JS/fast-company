import React, {useState} from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId)); // новый массив юзеров за исключением выбранного по клику на кнопку
    }
    const renderPhrase = (number) => {
        const lastItem = Number(number.toString().slice(-1));
        const ifLastNumbers = [2, 3, 4];
        if (lastItem === 1) {
            return 'человек тусанет';
        } else if (number > 4 && number < 15) { // при числах между 4 и 15
            return 'человек тусанет';
        } else if (ifLastNumbers.indexOf(lastItem) >= 0) { // при числах > 0, если окончание числа 2||3||4
            return 'человека тусанут';
        } else { // при 20 человек
            return 'человек тусанет'
        }
    }
    return (
        <>
            <h1>
                {/*панель с фразой*/}
                <span className={'badge ' + (users.length === 0 ? 'bg-danger' : 'bg-primary')}>
                    {users.length > 0
                        ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
                        : 'Никто не тусанет с тобой сегодня'
                    }
                </span>
            </h1>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился раз</th>
                        <th scope="col">Оценка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td key={user.qualities._id}>
                                {user.qualities.map((i) => (
                                    <span key={i._id} className={'badge m-1 bg-' + i.color}>
                            {i.name}
                        </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}</td>
                            <td>
                                <button className={'btn btn-primary bg-danger'} onClick={
                                    () => handleDelete(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )
            }
        </>
    )
};

export default Users;

