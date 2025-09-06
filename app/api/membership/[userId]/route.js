import ConnectDB from "@/db/ConnectDB";
import Membership from "@/models/Membership";

export async function GET(req, { params }) {
    try {
        await ConnectDB();

        const { userId } = params;
        const members = await Membership.find({ creator: userId }).populate("member", "username email");

        if (!members) return NextResponse.json({ message: "No member found" }, { status: 404 });

        return NextResponse.json({ members }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}