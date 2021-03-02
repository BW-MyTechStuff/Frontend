import React from 'react';

export default function SignUp(props) {
  const {values, disabled, submit, change} = props;
  
  function clickBack() {
    
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <h2>Sign Up</h2>
          <div>
            <label>First Name
              <input type='text' onChange={change} placeholder='John' name='first_name' value={values.first_name}/>
            </label>
            <label>Last Name
              <input type='text' onChange={change} placeholder='Doe' name='last_name' value={values.last_name}/>
            </label>
            <label>Username
              <input type='text' onChange={change} name='username' value={values.username}/>
            </label>
            <label>Email
              <input type='text' onChange={change} placeholder='abc123@abc.com' name='email' value={values.email} />
            </label>
            <label>Password
              <input type='text' onChange={change} name='password' value={values.password}/>
            </label>
            <h3>Account Role</h3>
            <label>
              <select
                onChange={change}
                value={values.account_role}
                name='account_role'
                >
                <option value=''>- Select -</option>
                <option value='sm'>OWNER</option>
                <option value='med'>RENTER</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <button disabled={disabled}>Sign Up</button>
        </div>
      </form>
      <div>
          <button onClick={clickBack}>Back</button>
        </div>
    </div>
  )
}