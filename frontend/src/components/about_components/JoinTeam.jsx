// import React from 'react'
// import '../components/JoinTeam.css'
import '../../style/about_style/JoinTeam.css';
import JoiningForm from './JoiningForm'

export default function JoinTeam() {
  return (
    <section className='join_team'>
      <div className="join_team_upper">
      <h1>Join Our Team</h1>
      <div className="team_req">
        <p>&quot;We don&apos;t just plan weddings; we create unforgettable moments. If you have a passion for bringing dreams to life, thinking creatively, and handling challenges with ease, we&apos;d love to have you on our team. Let&apos;s make magic together!&quot;
        </p>
      </div>
      </div>
      <JoiningForm/>
    </section>
  )
}
