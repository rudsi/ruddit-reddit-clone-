import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { Community } from "@/atoms/communitiesAtom";

type PageProps = {
  params: { communityId: string };
};

export default async function Page({ params }: PageProps) {
  const docRef = doc(firestore, "communities", params.communityId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const communityData: Community = {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() // Convert Firestore Timestamp to Date
    } as Community;

    return (
      <>
        <Header communityData={communityData} />
      </>
    );
  } else {
    return <NotFound />;
  }
}