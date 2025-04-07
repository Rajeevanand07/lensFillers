import '../style/info.css'

const Info = () => {
  return (
    <main className='info-containerr'>
      <section className="info" aria-labelledby="info-title">
        <div className="i_left">
          <h1>Capturing the moment, immerse in tale, bask in nostalgia, embrace that retorvibe</h1>
        </div>
        <div className="i_center">
          <img src="https://res.cloudinary.com/dmkjbp3cm/image/upload/v1743743266/lensfiller/lensFillersImages/ocvblvshwmwr8fnkzooa.png" alt="Company Logo" />
        </div>
        <div className="i_right">
          <p>At Lensfiller, we are passionate about storytelling through photography. We capture the essence of your special day, immortalizing every stunning detail to create exceptional imagery that tells your unique love story.</p>
        </div>
      </section>
    </main>
  )
}

export default Info
