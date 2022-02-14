import NumericInput from 'react-numeric-input';
import "../style/ProductAmount.scss";

function ProductAmount() {
    return (
        <>
        <div className='product-amount'>
            <NumericInput
                // style={false}
                min={1} 
                max={100} 
                value={1}
                mobile
            />
        </div>
        </>
    )
}

export default ProductAmount;