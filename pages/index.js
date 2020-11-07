import Link from 'next/link';
import baseUrl from '../helpers/baseUrl';


const Home = ({products}) => {
    const productList = products.map(product=>{
        return (
            <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title ">{product.name}</span>
        </div>
        <div className="card-content">
          <p> ₹ {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={'/product/[id]'} as={`/product/${product._id}`}> View Product</Link>
        </div>
      </div>
        )
    })
    // console.log(products);
    return (
        <div className="rootCard">
       {productList}
        </div>
    )
}

// export async function getServerSideProps(){
//     const res = await fetch(`${baseUrl}/api/products`)
//     const data = await res.json()
//     return{
//         props:{
//             products:data
//         }
//     }
// }
export async function getStaticProps(){
    const res = await fetch(`${baseUrl}/api/products`)
    const data = await res.json()
    return{
        props:{
            products:data
        }
    }
}

export default Home;