package org.apache.camel.example.reportincident;

import javax.xml.ws.Endpoint;

import org.apache.camel.component.file.FileComponent;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.junit.Test;
import org.jvnet.mock_javamail.Mailbox;

import junit.framework.TestCase;

public class ReportIncidentEndpointTest extends TestCase {
	private static String ADDRESS = "http://localhost:9090/unittest";
	private ReportIncidentEndpointImpl endpoint;
	 
	protected void startServer() throws Exception {
	    // We need to start a server that exposes or webservice during the unit testing
	    // We use jaxws to do this pretty simple
		ReportIncidentEndpoint server = new ReportIncidentEndpointImpl(false);
	    Endpoint.publish(ADDRESS, server);
	}
	
	protected ReportIncidentEndpoint createCXFClient() {
	    // we use CXF to create a client for us as its easier than JAXWS and works
	    JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
	    factory.setServiceClass(ReportIncidentEndpoint.class);
	    factory.setAddress(ADDRESS);
	    return (ReportIncidentEndpoint) factory.create();
	}
	
	@Test
	public void testRendportIncident() throws Exception {
	    startServer();
	 
	    ReportIncidentEndpoint client = createCXFClient();
	 
	    InputReportIncident input = new InputReportIncident();
	    input.setIncidentId("123");
	    input.setIncidentDate("2008-07-16");
	    input.setGivenName("Claus");
	    input.setFamilyName("Ibsen");
	    input.setSummary("bla bla");
	    input.setDetails("more bla bla");
	    input.setEmail("davsclaus@apache.org");
	    input.setPhone("+45 2962 7576");
	 
	    OutputReportIncident out = client.reportIncident(input);
	    assertEquals("Response code is wrong", "OK", out.getCode());
	}
	
	@Test
	public void testReportIncidentSendMail() throws Exception{
		// we run this unit test with the consumer, hence the true parameter
        endpoint = new ReportIncidentEndpointImpl(true);
 
        // get the mailbox
        Mailbox box = Mailbox.get("jacksondat@gmail.com");
        assertEquals("Should not have mails", 0, box.size());
 
        // drop a file in the folder that the consumer listen
        // here is a trick to reuse Camel! so we get the producer template and just
        // fire a message that will create the file for us
        endpoint.getTemplate().sendBodyAndHeader("file://target/subfolder?append=false", "Hello World",
            FileComponent.HEADER_FILE_NAME, "mail-incident-test.txt");
 
        // let the consumer have time to run
        Thread.sleep(3 * 1000);
 
        // get the mock mailbox and check if we got mail ;)
        assertEquals("Should have got 1 mail", 1, box.size());
        assertEquals("Subject wrong", "New incident reported", box.get(0).getSubject());
        assertEquals("Mail body wrong", "Hello World", box.get(0).getContent());
	}
	
}
