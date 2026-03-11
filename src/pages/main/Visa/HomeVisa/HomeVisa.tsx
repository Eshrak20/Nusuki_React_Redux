import { useGetVisasQuery } from "@/redux/api/visaApi";
import CountryVisaCard from "./CountryVisaCard";
import FilterCategory from "./FilterCategory";
import HelpDesk from "./HelpDesk";
import HowItWorks from "./HowItWorks";
import VisaBanner from "./VisaBanner";
import VisaStats from "./VisaStats";
import EduPagination from "@/components/education/EduPagination";
import { useDispatch, useSelector } from "react-redux";
import CountryVisaCardSkeleton from "@/components/skeletons/CountryVisaCardSkeleton";
import { setPageVisa } from "@/redux/features/visaFilterSlice";
import type { RootState } from "@/redux/store";

const HomeVisa = () => {

    const dispatch = useDispatch()
    const { page, visa_category, country } = useSelector(
        (state: RootState) => state.visaFilter,
    );
    const { data, isLoading } = useGetVisasQuery(
        {
            page,
            visa_category,
            country
        }
    );

    const visas = data?.data?.data ?? [];
    const pagination = data?.data;

    return (
        <>
            <div className="mt-22">
                <VisaBanner />

                <VisaStats />
                <FilterCategory />
                <div className="max-w-7xl mx-auto">
                    <div className="py-14 lg:py-16">
                        {isLoading ? (
                            <CountryVisaCardSkeleton />
                        ) : visas.length > 0 ? (
                            <CountryVisaCard visas={visas} />
                        ) : (
                            <div className="text-center py-20 text-muted-foreground">
                                No visas found matching your criteria.
                            </div>
                        )}
                    </div>


                    {pagination && (
                        <EduPagination
                            pagination={{
                                current_page: pagination.current_page,
                                last_page: pagination.last_page,
                            }}
                            onPageChange={(newPage: number) => dispatch(setPageVisa(newPage))}
                        />
                    )}

                    <HowItWorks />
                </div>
                <HelpDesk />
            </div>
        </>
    );
};

export default HomeVisa;