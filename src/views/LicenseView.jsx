export default function LicenseView() {
  return (
    <div className="license">
      <div className="page-shell license__inner">
        <div className="gallery-head">
          <h1>授权说明</h1>
          <p>下载即表示你已阅读并同意以下条款。</p>
        </div>

        <section className="license-section">
          <h2>授权范围</h2>
          <p>
            除非素材条目单独标注，本站素材仅限个人非商业使用。未经授权，
            不得修改、改编、合成或以其他方式制作衍生作品，也不得用于任何商业项目。
          </p>
        </section>

        <section className="license-section">
          <h2>你可以</h2>
          <ul>
            <li>将素材用于个人学习、研究与非商业展示；</li>
            <li>在遵守本说明的前提下下载并保存素材原文件；</li>
            <li>在个人非商业项目中展示未经修改的素材。</li>
          </ul>
        </section>

        <section className="license-section">
          <h2>你不可以</h2>
          <ul>
            <li>将素材原文件单独打包，作为素材库或图库转售；</li>
            <li>修改、改编、合成素材，或制作基于素材的衍生作品；</li>
            <li>将素材用于商业项目、广告、商品、付费服务或商业宣传；</li>
            <li>使用素材注册商标，或宣称素材由你原创；</li>
            <li>将素材用于违反法律法规的用途。</li>
          </ul>
        </section>

        <section className="license-section">
          <h2>第三方来源素材</h2>
          <p>
            部分素材条目在详情中标注了「来源」。此类素材的著作权归原作者所有，
            使用前请遵循来源页面所附的授权条款；标注「见来源说明」的素材不适用本站默认授权说明。
          </p>
        </section>

        <section className="license-section">
          <h2>免责声明</h2>
          <p>
            素材按「现状」提供，不附带任何明示或默示的担保。在任何情况下，
            Quantum Original 均不对因使用素材而产生的索赔、损害或其他责任承担责任。
          </p>
        </section>
      </div>
    </div>
  )
}
