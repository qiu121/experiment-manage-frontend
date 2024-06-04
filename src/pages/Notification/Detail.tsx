
import { Card, Alert } from 'antd'


type MessageProps = {
  from: string,
  message: string
}

export default (props : MessageProps) => {
  const { from, message } = props


  return (
    <>
      <Card>
      <Alert
        message={`${from}:`}
        description={message}
        type="info"
        showIcon
      />
      </Card>
    </>
  )
}
