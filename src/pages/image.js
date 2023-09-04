import { Image } from 'antd'
import imageGet from '../images/Studio_Project_V1.png';

const CompleteImage = () => (
  <Image.PreviewGroup
  items={[
    `${imageGet}`,
    `${imageGet}`,
    `${imageGet}`,
  ]}
>
  <Image
    width={300}
    src={imageGet}
  />
</Image.PreviewGroup>
);
export default CompleteImage;