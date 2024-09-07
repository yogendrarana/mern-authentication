const asyncHandler = (passedFunction) => {
    return (req, res, next) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
};
export default asyncHandler;
