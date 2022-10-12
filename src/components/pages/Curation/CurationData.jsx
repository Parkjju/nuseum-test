import {
    CurationBox,
    CurationFood,
    CurationFoodList,
    CurationFoodTitle,
    CurationType,
    CurationTypeImage,
    CurationTypeName,
} from './Curation.styled';

const CurationData = ({ data }) => {
    return (
        <CurationBox>
            <CurationType>
                <CurationTypeImage src={data.image} alt={`${data.image}`} />
                <CurationTypeName>{data.type}</CurationTypeName>
            </CurationType>
            <CurationFood>
                <CurationFoodTitle>{data.main}</CurationFoodTitle>
                <CurationFoodList>
                    {data.list.map((item, index) => (
                        <span key={index}>
                            {item.length > 7 ? `${item.slice(0, 7)}..` : item}
                        </span>
                    ))}
                </CurationFoodList>
            </CurationFood>
        </CurationBox>
    );
};

export default CurationData;
