import { getProviders } from "next-auth/client"
import { useEffect, useRef, useState } from "react"
import classes from "./profile-form.module.css"

function ProfileForm({ onChangePassword }) {
  const [passwordChangingStatus, setPasswordChangingStatus] = useState("")

  const oldPasswordInputRef = useRef()
  const newPasswordInputRef = useRef()

  async function handleChangePassword(event) {
    event.preventDefault()

    const oldPassword = oldPasswordInputRef.current.value
    const newPassword = newPasswordInputRef.current.value
    onChangePassword({ oldPassword, newPassword }).then((message) => {
      setPasswordChangingStatus(message)
    })
  }

  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" ref={newPasswordInputRef} id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
        {passwordChangingStatus && <p>{passwordChangingStatus}</p>}
      </div>
    </form>
  )
}

export default ProfileForm
