import AWS from 'aws-sdk'

function main (){

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.aws_access_key_id;
    AWS.config.secretAccessKey = process.env.aws_secret_access_key;
    AWS.config.region = "eu-west-3";


    const S3 = new AWS.S3({
        params: { Bucket: 'cine-street' },
      })

      S3.listObjects((err, data)=> {
        //   console.log(err, data)
      })

      S3.getObject({Key:'santa.png'},(err,data)=>{
          console.log(data)
      })
}

export default main;