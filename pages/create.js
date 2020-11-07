import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import baseUrl from '../helpers/baseUrl';


const Create = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [media, setMedia] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const mediaUrl = await imageUpload()
            const res = await fetch(`${baseUrl}/api/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name,
                    price,
                    mediaUrl,
                    description
                })
            })
            const res2 = await res.json()
            if (res2.error) {
                M.toast({ html: res2.error, classes: "red" })
            }
            else {
                router.push('/');
                M.toast({ html: "Product saved", classes: "green" });
                
            }
        } catch (err) {
            console.log(err)
        }
        // console.log(name, price, media, desc);
    }

    const imageUpload = async () => {
        const data = new FormData()
        data.append("file", media)
        data.append("upload_preset", "pmstore")
        data.append("cloud_name", "priyank")
        const res = await fetch("https://api.cloudinary.com/v1_1/priyank/image/upload", {
            method: "POST",
            body: data
        })
        const res2 = await res.json()
        return res2.url;
    }
    return (
        <div className="container" style={{marginTop:"20px"}}>
        <h3 className="center">Add the product in your shop</h3>
        <hr/>
        <br />
        <br />
            <form className="container" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="name" placeholder="Product Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" name="price" placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <div className="file-field input-field">
                    <img className="responsive-img" src={media ? URL.createObjectURL(media) : ""} />
                    <div className="btn">
                        <span>File</span>
                        <input type="file" accept="image/*" onChange={(e) => setMedia(e.target.files[0])} placeholder="Product Image"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" name="description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    <label for="textarea1">Description</label>
                </div>
                <button className="btn waves-effect waves-light center" type="submit" >Submit
                <i className="material-icons right">send</i>
                </button>

            </form>

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx)
    const user = cookie.user ? JSON.parse(cookie.user) : "" 
    if (user.role == "user" || user.role == "") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end();
    }
    return {
        props: {}
    }
}


export default Create;