import { useContext, } from "react";
import { StateContext } from "~/contexts/stateContext";
import ProductLayoutBasic from "~/components/Product/basic";
const Sale = () => {
    const {saleData} = useContext(StateContext)
    return <div className="h-sale w-full h-auto flex flex-wrap justify-center items-center">
        {saleData !== null && saleData?.length !== 0 && saleData?.map(s =>
            <>
                <h1 className="font-pr textEffect animate">{s.title}</h1>
                <span className="font-medium text-[40px] text-center font-honk animate">{s.startDate} - {s.endDate}</span>
                <div className="saleDetail w-full lg:w-[90%] h-auto flex flex-wrap justify-center items-center px-8">
                    {
                        s.detail.map(d => <ProductLayoutBasic props={{d}}/>)
                    }
                </div>
            </>
        )}
    </div>
}
export default Sale;