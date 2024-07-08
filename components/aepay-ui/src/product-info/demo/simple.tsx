import React from 'react';
import { ProductInfo } from '@ali/aepay-ui';

const App: React.FC = () => {
  return (
    <>
      <ProductInfo
        data={{
          orderId: '8180254600145002',
          productId: '1005003765658132',
          productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
          productUrl:
            'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
          skuDesc: 'Color:Blue,Size:S',
        }}
      />
      <h2 style={{ fontSize: 16, marginTop: 24, marginBottom: 8 }}>超长省略</h2>
      <ProductInfo
        data={{
          orderId: '8180254600145002',
          productId: '1005003765658132',
          productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
          productUrl:
            'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
          skuDesc: '颜色：蓝色，规格：一盒5件，重量：500g',
        }}
        style={{ width: 300 }}
      />
      <h2 style={{ fontSize: 16, marginTop: 24, marginBottom: 8 }}>隐藏skuDesc</h2>
      <ProductInfo
        data={{
          orderId: '8180254600145002',
          productId: '1005003765658132',
          productTitle: '印尼进口丽芝士威化饼干145g10盒多口味任选纳宝帝nabati休闲零食',
          productUrl:
            'https://gw.alicdn.com/bao/uploaded/i2/2206632384781/O1CN01cc0auR1lBkUNL8OhQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
          skuDesc: '颜色：蓝色，规格：一盒5件，重量：500g',
        }}
        style={{ width: 300 }}
        hiddenSKUDesc
      />
    </>
  );
};

export default App;
