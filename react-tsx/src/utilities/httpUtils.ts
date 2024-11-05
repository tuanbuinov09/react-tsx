import useLocalStorage from "../hooks/useLocalStorage"

export const buildAuthorizationHeader = () => {
    const [token, _] = useLocalStorage("token", "");

    return { Authorization: `Bearer ${token}` };
}