import React from 'react';
import classNames from "classnames/bind";
import style from '../Home.module.scss'

const cx = classNames.bind(style)

const product = [
    {
        url: 'https://maychuviet.vn/wp-content/uploads/2022/01/msi-ra-mat-hang-loat-laptop-gaming-tai-ces-2022-1-768x768.jpg' ,
        title: 'MSI Raider GE77' ,
        money:'150 USD',
    },
    {
        url: 'https://laptopworld.vn/media/product/9770_msi_stealth_gs77__6.jpg',
        title:'MSI Stealth GS77',
        money:'150 USD',
    },
    {
        url: 'https://asset.msi.com/resize/image/global/product/product_16508778406995d92c4e8918c5ce4de7d9d90fb00b.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
        title:'MSI Titan-GT77',
        money:'150 USD',
    },
    {
        url: 'https://m.media-amazon.com/images/I/41bbH3aJ8dL.jpg',
        title:'Acer Predator Helios 300',
        money:'150 USD',
    },
    {
        url: 'https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/98/69/986912_notebook-gamer-acer-predator-helios-700-17-3-i7-9750h-2-6ghz-1tbplus512gb-32gb-rtx2080-8gb-win10-homenac006385_m1_637103863801067187.jpg',
        title:'Acer Predator Helios 700',
        money:'150 USD',
    },
    {
        url: 'https://salt.tikicdn.com/ts/product/f1/53/f6/2ed9cb2f883df319ddca546390d6fd21.jpg',
        title:'Acer Gaming Nitro 5',
        money:'150 USD',
    },
    {
        url: 'https://www.red-dot.org/index.php?f=89862&token=a49abe8128ef04c1c0e16750f73b915f6d717466&eID=tx_solr_image&size=large&usage=hero',
        title:'Asus Gaming ROG Flow 2022',
        money:'150 USD',
    },
    {
        url: 'https://hanoilab.com/wp-content/uploads/2021/12/Zenbook-Pro-Duo-15-OLED-UX582-1.jpg',
        title:'Asus ZenBook Pro Duo 15',
        money:'150 USD',
    },
    {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnx23qcr8wnRFAZYwMQAijLhu4b3cIgppzfHQ-GEm0E_ePMojZGu2st8D45dH4e8srJH4&usqp=CAU',
        title:'Asus Rog Zephyrus Duo 6 2022',
        money:'150 USD',
    },
]

const Product = () => {
    return (
      <div className={cx('product')}>
         {product.map((product, index)=> (
            <div className={cx('product-infor')} key={index}>
                <div className={cx('product-detail')}>
                    <img src={product.url} alt="Slide-show" />
                    <div className={cx('title')}><p>{product.title}</p></div>
                    <div className={cx('money')}>{product.money}</div>
                    <button>Thêm vào giỏ hàng</button>
                </div>
            </div>
          ))} 
      </div>
    )
  }

  export default Product;