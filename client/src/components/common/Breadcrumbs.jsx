import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths = [] }) => {
    return (
        <nav className="flex text-sm mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;
                    return (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="text-gray-400 mx-2">/</span>
                            )}
                            {isLast ? (
                                <span className="text-black font-bold capitalize truncate max-w-xs">
                                    {path.name}
                                </span>
                            ) : (
                                <Link
                                    to={path.link}
                                    className="text-gray-500 hover:text-blue-600 transition-colors capitalize"
                                >
                                    {path.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
