import { useSelector } from 'react-redux';
export default function Cart({ children }) {
    const cart = useSelector((state) => state.cart);
    const total = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <>
            <span className='text-white'> {total}</span>
        </>
    );
}