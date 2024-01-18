import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#001529',
        marginTop: 16,
        padding: '0 8px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 0',
          color: '#fff'
        }}
      >
        <p style={{ textAlign: 'center' }}>
          Mọi thông tin và hình ảnh trên website đều được sưu tầm trên Internet. Chúng tôi không sở hữu hay chịu trách
          nhiệm bất kỳ thông tin nào trên web này. Nếu làm ảnh hưởng đến cá nhân hay tổ chức nào, khi được yêu cầu,
          chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức.
        </p>
        <p style={{ textAlign: 'center' }}>
          <Link to='/'>Truyenmoi.fun</Link> ©2024 - Contact me:{' '}
          <a href='mailto:truyenmoi@proton.me'>truyenmoi@proton.me</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
