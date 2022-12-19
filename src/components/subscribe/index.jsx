import React, {useState} from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp'


const Subscribe = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email.trim().length || !isValidEmail(email)){
        setError("Please enter a valid email address!");
        return;
    }

    const result = await addToMailchimp(email);
    if(result.result === 'success'){
        setError('');
        setSuccess(result.msg);
    }
  }

  const isValidEmail = (emailAddress) => {
    return /\S+@\S+\.\S+/.test(emailAddress);
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white blog-content">
        <form>
            <div>
                Want to stay up to date on the latest programming trends and techniques? 
                <br></br><br></br>
                Subscribe to the email list and never miss a post!<br></br><br></br>
            </div>
            <div className="form-group mb-6">
            <input type="email" className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput91"
                placeholder="Email address" 
                onChange={handleEmailChange}></input>
                
                {error && <p className='text-red-600 pt-6'>{error}</p>}
                {success && <p className='pt-6'>{success}</p>}
            </div>
            <button type="submit" className="
            w-full
            px-6
            py-3
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out" onClick={handleSubmit}>Subscribe</button>
        </form>
    </div>
  );
};

export default Subscribe;
