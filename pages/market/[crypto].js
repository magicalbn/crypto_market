import { useRouter } from 'next/router'
//api calls
import { getCryptoDetails } from '../../axios/lib/cryptoAPICalls'
//component
import Layout from '../../components/Layout'
const Crypto = ({ cryptoData, cryptoQuery }) => {
    const router = useRouter()

    const { Ask, BaseVolume = 'NA', Bid, Created = 'NA', High, Last, Low, MarketName, OpenBuyOrders = 'NA', OpenSellOrders = 'NA', PrevDay, TimeStamp = 'NA', Volume = 'NA' } = cryptoData

    let imageLink, createdDate, timeStamp, netGross
    if (MarketName) {
        imageLink = `/icons/${MarketName.toLowerCase().split('-')[0]}-icon-600.png`
        createdDate = new Date(Created)
        createdDate = createdDate.toString().split(' ').slice(1, 5).join(' ')
        timeStamp = new Date(TimeStamp)
        timeStamp = timeStamp.toString().split(' ').slice(1, 5).join(' ')
        netGross = ((Ask - PrevDay)/PrevDay*100).toFixed(2) 
    }


    return (
        <Layout>
            <div className='container market'>
                <button onClick={() => router.back()} className='back'>&lt; Back</button>
                {MarketName ? (
                    <div className='crypto-content'>
                        <img alt='crypto-logo' src={imageLink}></img>
                        <div className='details'>
                            <h2 className='market-name'>{MarketName}</h2>
                            <div className='details-content'>
                                <div className='left'>

                                    <p><span className='label'>Created: </span>{createdDate}</p>
                                    <p><span className='label'>Ask: </span>{Ask} (<span className={ netGross<0?'gross loss':'gross profit'}>{netGross}%</span>)</p>
                                    <p><span className='label'>Previous day: </span>{PrevDay}</p>
                                    <p><span className='label'>Bid: </span>{Bid}</p>
                                    <p><span className='label'>Timestamp: </span>{timeStamp}</p>
                                    <p><span className='label'>Base Volume: </span>{BaseVolume}</p>
                                    <p><span className='label'>Volume: </span>{Volume}</p>
                                </div>
                                <div className='right'>
                                    <p><span className='label'>High: </span>{High}</p>
                                    <p><span className='label'>Low: </span>{Low}</p>
                                    <p><span className='label'>Last: </span>{Last}</p>
                                    <p><span className='label'>Open Buy Orders: </span>{OpenBuyOrders}</p>
                                    <p><span className='label'>Open Sell Orders: </span>{OpenSellOrders}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                ) : <p className='error'>Error: No Market Summary found for '{cryptoQuery}'.</p>}

            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const cryptoQuery = context.params.crypto //Get crypto name from url
    const data = await getCryptoDetails(cryptoQuery)

    return {
        props: {
            cryptoData: data,
            cryptoQuery: cryptoQuery
        }
    }
}


export default Crypto

