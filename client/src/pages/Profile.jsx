import { useSelector } from "react-redux";
import { useState } from "react";
import {
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  signoutUserFailure,
  signoutUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);//dekh liyo ek baar
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess("user updated successfully"));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message || "unknown error"));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const req = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await req.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    console.log('signoutUser started');
    try {
      dispatch(signoutUserStart());
      console.log('action dispatched');
      const res = await fetch('/api/auth/signout');
      console.log('route fetched');
      const data = await res.json();
      if (data.success === false) {
        console.error('data fetch failure');
        dispatch(signoutUserFailure(data.message));
        return;
      } else {
        console.log('data fetched successfully');
      }
      dispatch(signoutUserSuccess());
      console.log('action dispatched and user signedout');
    } catch (error) {

    }
  }

  const handleShowListings = async () => {
    console.log('handleShowListings called');
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);

      const data = await res.json();;
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      console.log('data', data);
      setUserListings(data);
    }
    catch (error) {
      setShowListingsError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    console.log('delete listings started')
    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? "request ok" : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "Profile successfully updated!" : ""}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && 
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => <div key={listing._id}  className="border-rounded-lg p-3 flex justify-between items-center gap-4">            
            <Link to={`listings/${listing._id}`} >
              <img src={listing.imgUrls[0]} alt="listing cover" className="h-16 w-16 object-contain "/>
            </Link>
            <Link className="text-slate-700 font-semibold hover:underline truncate  flex-1" to={`listing/${listing._id}`}>
              <p>{listing.name} </p>
            
            </Link>

          <div className="flex flex-col item-center">
            <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
            <button className="text-green-700 uppercase">Edit</button>
          </div>


          </div>)}

        </div>}
        



    </div>
  );
}
