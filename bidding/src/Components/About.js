import React from 'react';
import Header from './Header';

const About = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '60px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    content: {
      lineHeight: '1.6',
    },
    section: {
      marginBottom: '30px',
    },
    sectionHeading: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#007bff', // Example color
    },
  };

  return (
    <div>
      <Header />

      <div style={styles.container}>
        <h1 style={styles.heading}>About Online Auctions</h1>
        <div style={styles.content}>
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Introduction</h2>
            <p>
              An online auction (also electronic auction, e-auction, virtual auction, or eAuction) is an auction held over the internet and accessed by internet-connected devices. Similar to in-person auctions, online auctions come in a variety of types, with different bidding and selling rules. E-commerce sales for businesses have been steadily increasing for years, and with the migration of virtually all transactions to digital due to the COVID-19 pandemic, worldwide sales through ecommerce channels such as websites and online marketplaces increased overall in 2020 and beyond.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>History</h2>
            <p>
              Online auctions originated on web forums as early as 1979 on CompuServe and The Source, as well as through email and bulletin board systems. Auctioneers and sellers would post notices describing items for sale, minimum bids, and closing times. As the popularity of online auctions grew, websites dedicated to the practice began to appear in 1995 when two auction sites were founded.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Benefits of Online Auctions</h2>
            <p>
              Online auctions offer advantages such as the removal of physical limitations present in traditional auctions, thereby expanding audience reach. They provide automated bid options, increasing the variety of goods and services available in an auction format. Additionally, online auctions often allow participants from around the world to participate, fostering a global marketplace.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Types of Online Auctions</h2>
            <p>
              Online auctions encompass various types, including English auctions, reverse auctions, and bidding fee auctions, each with its distinct characteristics and purposes. English auctions involve ascending bids, while reverse auctions involve descending bids. Bidding fee auctions, on the other hand, require participants to pay a non-refundable fee to place a small incremental bid.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Challenges and Future Trends</h2>
            <p>
              Despite the benefits, online auctions face challenges such as trust issues, security concerns, and fraudulent activities. However, advancements in technology, including blockchain, are being explored to address these challenges and enhance the security and transparency of online auctions. The future of online auctions holds the promise of increased innovation, wider adoption, and improved user experiences.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
