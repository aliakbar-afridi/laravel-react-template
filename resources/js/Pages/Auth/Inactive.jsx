import GuestLayout from "@/Layouts/GuestLayout";
import { userStatus } from "@/Utilities/UiHelper";
import { Head, Link } from "@inertiajs/react";

export default function AccountDisabled({ status }) {
    return (
        <GuestLayout>
            <Head>
                <title>Account inactive</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <h2>Account {userStatus(status)}</h2>
            <hr />
            <p className="mb-4 text-sm text-gray-600 mt-4     ">
                Your account has been set to {userStatus(status)}. To resolve
                this issue and reactivate your account, please contact the
                system administrator. If your account is currently pending or
                under observation, reaching out to the system administrator is
                also necessary.
            </p>
            <p>Thank you for your understanding.</p>

            <p
                className="text-end"
                style={{
                    fontFamily: '"Noto Nastaliq Arabic", serif',
                    fontOpticalSizing: "auto",
                    fontStyle: "normal",
                    fontSize:20,
                    lineHeight: 1.4,
                }}
            >
                ستاسو پروفایل غیر فعال شوی دی. د دې مسلې د حل کولو او خپل
                پروفایل بیا فعالولو لپاره، مهرباني وکړئ د سیسټم مدیر سره اړیکه
                ونیسئ. که ستاسو پروفایل اوس مهال پاتې وي یا تر نظارت لاندې وي، د
                سیسټم مدیر ته رسیدل هم اړین دي. دوی د معروف خیل په دفتر کې شتون
                لري ستاسو د پوهیدو لپاره مننه.
            </p>

            <div className="mt-4 d-flex align-items-start flex-wrap gap-2 justify-content-end">
                <Link
                    href={route("profile.edit")}
                    as="button"
                    className="btn btn-secondary"
                >
                   Edit Profile
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="btn btn-secondary text-nowrap"
                >
                    Log Out
                </Link>
            </div>
        </GuestLayout>
    );
}
