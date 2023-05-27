import TopSection from "../../components/homeBackground";
import SearchAndFilterBar from "../../components/search&filter";
import VenuesList from "../../components/venues";

function HomePage() {
  return (
    <>
      <TopSection />
      <SearchAndFilterBar />
      <VenuesList />
    </>
  );
}

export default HomePage;
