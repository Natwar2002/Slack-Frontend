export default function CombineContext(...providers) {
    return ({ children }) => {
        return providers.reduceRight((accumulator, CurrentProvider ) => {
            return <CurrentProvider>{accumulator}</CurrentProvider>;
        }, children);
    };
}