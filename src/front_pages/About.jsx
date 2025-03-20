function About() {
  return (
    <div className="container-fluid">
      <div
        className="position-fixed w-100 h-100"
        style={{
          top: 0,
          left: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          opacity: 0.6,
          zIndex: -1,
        }}
      ></div>
      <div className="container position-relative d-flex">
        <div className="my-5">
          <h3 className="mt-3 mb-4 text-center text-md-start">關於我們</h3>
          <div className="text-center mt-3 mb-3 d-flex flex-column align-items-center">
            <h4 className="my-5">關於筑紫的由來</h4>
            <p
              className="mx-auto fs-6 mb-6 mt-4"
              style={{
                lineHeight: "2",
                maxWidth: "70%",
              }}
            >
              「筑紫旅遊」的名稱源自日本九州的舊稱「筑紫」（Tsukushi）。「筑紫」代表著九州悠久的歷史與文化，是日本古代文獻中對這片土地的稱呼。選擇「筑紫」作為旅遊品牌名稱，融合了「紫」這個高雅神秘的色彩意象，象徵深厚文化底蘊與尊貴氣質，展現對九州之美的敬意。同時，「筑紫」也象徵著搭建一座通往九州的文化橋樑，帶領旅人探索這片土地的自然風光、人文風情與美食文化，開啟一段難忘的旅程。
            </p>
            <h4 className="my-4">為何我們專注於九州</h4>
            <p
              className="mx-auto fs-6 mb-6 mt-4"
              style={{
                lineHeight: "2",
                maxWidth: "70%",
              }}
            >
              對於許多人來說，第一次的日本自由行，東京、大阪、京都等大城市往往是首選。這些地方的交通便利，語言溝通相對容易，對觀光客來說相當友善。然而，在這些熱門景點，你是否也曾有過一種感覺——四周幾乎都是來自世界各地的遊客，讓旅程少了一點「日本當地的氛圍」？
              <br />
              如果你想要體驗更原汁原味的日本，那麼九州將會是一個很好的選擇。這裡保留了許多純樸的日式風情，擁有豐富的溫泉文化、傳統建築、美食與自然景觀，讓人能夠感受到不同於關東、關西的日本魅力。
              <br />
              我們特別推薦九州給那些真正熱愛日本文化的旅人，希望能夠深入探索當地的生活方式、感受更純粹的日式氛圍。即使你不選擇我們的行程，也希望這段介紹能夠幫助你發現九州的魅力，並將這個寶藏級的目的地推薦給對日本文化感興趣的朋友們！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
