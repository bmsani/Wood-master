import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`http://localhost:5000/admin/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        console.log('token did not match');
                    }
                    return res.json()
                })
                .then(data => {
                    setAdmin(data.admin)
                    setAdminLoading(false);
                })
        }
    }, [user])
    return [admin, adminLoading]
}
export default useAdmin;