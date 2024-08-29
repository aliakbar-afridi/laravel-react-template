import { Link } from "react-router-dom";

export default function Pagination({ meta }) {
    return (
        <div className="d-flex justify-content-between mt-3 p-2">
            <p>
                {meta.links.length > 0
                    ? "Showing " +
                    meta.from +
                    " to " +
                    meta.to +
                    " of " +
                    meta.total + " entries"
                    : ""}
            </p>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {meta.links.map((link, index) => (
                        <li key={index} className="page-item">
                            <Link
                                className={
                                    "page-link " + (link.active ? "active" : "")
                                }
                                as="button"
                                type="button"
                                href={link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
