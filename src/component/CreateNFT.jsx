import {
    useGlobalState,
    setGlobalState,
    setLoadingMsg,
    setAlert,
  } from '../store'
  import { useState } from 'react'
  import { FaTimes } from 'react-icons/fa'
  import { create } from 'ipfs-http-client'
  import { mintNFT } from '../Blockchain.Services'
  const client = create({
    host: 'localhost',
    port: 5001,
    protocol: 'http',
  });
const CreateNFT = () => {
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imgBase64, setImgBase64] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !price || !description) return

        setGlobalState('modal', 'scale-0')
        setLoadingMsg('Uploading IPFS data...')
    
        try {
        const metadataURI = `https://ipfs.io/ipfs/${fileUrl}`;
          const nft = { title, price, description, metadataURI }
            console.log(nft)
          setLoadingMsg('Intializing transaction...')
          await mintNFT(nft)
    
          resetForm()
          setAlert('Minting completed...', 'green')
        } catch (error) {
          console.log('Error uploading file: ', error)
          setAlert('Minting failed...', 'red')
        }
      }
    
      const changeImage = async (e) =>{
         var file = e.target.files[0];
      //check for file extension
      try {
        const response =  await client.add(file);

        if (response) {
            console.log(response.cid);
          console.log("Uploaded image to Pinata: ", response);
          setFileUrl(response.cid);
        }
      } catch (e) {
        console.log("Error during file upload", e);
      }
    }
  

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
    }

    const resetForm = () => {
        setFileUrl('')
        setImgBase64(null)
        setTitle('')
        setPrice('')
        setDescription('')
      }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transfomr duration-300 ${modal}`}>
            <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold text-gray-400">Add NFT</p>
                    <button
                    type="button"
                    onClick={closeModal}
                    className="border-0 bg-transparent focus:outline-none"
                    >
                    <FaTimes className="text-gray-400" />
                    </button>
                </div>

                <div className="flex flex-row justify-center items-center rounded-xl mt-5">
                    <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                    <img
                        className="h-full w-full object-cover cursor-pointer"
                        src={imgBase64 || "1st nft.png"} alt={"NFT"}
                    />
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                    <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#19212c] file:text-gray-400
                        hover:file:bg-[#1d2631]
                        cursor-pointer focus:ring-0 focus:outline-none"
                        onChange={changeImage}
                        required
                    />
                    </label>
                </div>

                <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                    <input
                    className="block w-full text-sm
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>

                <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                    <input
                    className="block w-full text-sm
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0"
                    type="number"
                    step={0.001}
                    min={0.001}
                    name="price"
                    placeholder="Price (Eth)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                </div>

                <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
                    <textarea
                    className="block w-full text-sm resize-none
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0 h-20"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                    ></textarea>
                </div>

                <button
                    className="flex flex-row justify-center items-center
                    w-full text-white text-md bg-[#e32970]
                    hover:bg-[#bd255f] py-2 px-5 rounded-full
                    drop-shadow-xl border border-transparent
                    hover:bg-transparent hover:text-[#e32970]
                    hover:border hover:border-[#bd255f]
                    focus:outline-none focus:ring mt-5"
                >
                    Mint Now
                </button>

            </form>
            </div>
        </div>
    )
}

export default CreateNFT 