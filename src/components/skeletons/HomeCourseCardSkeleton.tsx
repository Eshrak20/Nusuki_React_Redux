const HomeCourseCardSkeleton = () => {
    // We render 3 items by default to match the initial grid view
    const skeletonItems = Array.from({ length: 3 });

    return (
        <div className="my-6 lg:my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 lg:p-6">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="bg-card dark:bg-card-dark rounded-2xl border border-muted dark:border-muted-dark flex flex-col relative shadow-sm overflow-hidden animate-pulse"
                >
                    <div className="p-5 flex flex-col grow">
                        {/* Titles Skeleton */}
                        <div className="mb-5">
                            {/* Course Name lines */}
                            <div className="h-7 bg-muted dark:bg-muted-dark rounded-md w-3/4 mb-2" />
                            <div className="h-7 bg-muted dark:bg-muted-dark rounded-md w-1/2 mb-4" />
                            
                            {/* University Name */}
                            <div className="h-4 bg-muted dark:bg-muted-dark rounded-md w-1/3" />
                        </div>

                        <hr className="border-muted dark:border-muted-dark mb-4" />

                        {/* Details List & Logo Row */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex flex-col gap-4 grow pr-4">
                                {/* Study Level */}
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-muted dark:bg-muted-dark rounded-full" />
                                    <div className="h-4 bg-muted dark:bg-muted-dark rounded-md w-24" />
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-muted dark:bg-muted-dark rounded-full" />
                                    <div className="h-4 bg-muted dark:bg-muted-dark rounded-md w-32" />
                                </div>
                            </div>

                            {/* Logo Box */}
                            <div className="w-16 h-16 shrink-0 bg-muted dark:bg-muted-dark rounded-2xl" />
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex gap-3 mt-auto">
                            <div className="w-full h-11 bg-muted dark:bg-muted-dark rounded-lg" />
                            <div className="w-full h-11 bg-muted dark:bg-muted-dark rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeCourseCardSkeleton;