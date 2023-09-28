import { FaHouseChimney } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface BreadcrumbsInterface {
    path: {
        label: string;
        link?: string;
    }[];
}

export default function Breadcrumbs({ path }: BreadcrumbsInterface) {
    const dynamic = path.map((item, index) => {
        return (
            <li key={index}>
                {item.link ? (
                    <Link
                        to={item.link}
                        className="link link-hover  text-gray-500 "
                    >
                        {item.label}
                    </Link>
                ) : (
                    <>{item.label}</>
                )}
            </li>
        );
    });
    return (
        <div className="breadcrumbs ">
            <ul className="pl-0">
                <li>
                    <Link to="/" className="link link-hover text-gray-500 ">
                        <FaHouseChimney className="text-md relative top-[1px] mr-1.5 text-[16px]" />
                        Home
                    </Link>
                </li>
                {dynamic}
            </ul>
        </div>
    );
}
