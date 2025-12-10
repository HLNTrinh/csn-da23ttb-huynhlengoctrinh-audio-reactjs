import React from "react";
import "./footer.css";

export default function Footer() {
  const partners = [
    "1.jpg", "2.jpg", "3.webp", "3.jpg", "6.webp",
    "1.png", "7.webp", "7.jpg", "6.jpg",
    "8.jpg", "9.jpg", "10.jpg", "4.webp","11.jpg"
  ];

  return (
    <div className="footer">
      {/* Đối tác âm nhạc */}
      <h2 className="footer-title">ĐỐI TÁC ÂM NHẠC</h2>

      <div className="partners-grid">
        {partners.map((img, index) => (
          <div key={index} className="partner-box">
            <img src={`./partners/${img}`} alt="" />
          </div>
        ))}
      </div>

      <div className="footer-content">

        {/* Doanh nghiệp */}
        <div className="footer-block">
          <h4>Doanh nghiệp quản lý</h4>
          <p>Địa chỉ: Phường Hòa Thuận, Vĩnh Long Việt Nam.</p>
          <p>Huỳnh Lê Ngọc Trinh</p>
        </div>

        {/* Dịch vụ */}
        <div className="footer-block">
          <h4>Thông tin dịch vụ</h4>
          <p>CSKH/Liên hệ qua Zalo: 0347293114</p>

        </div>
      </div>
    </div>
  );
}
