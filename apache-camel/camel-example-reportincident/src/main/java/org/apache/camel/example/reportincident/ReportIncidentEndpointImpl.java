package org.apache.camel.example.reportincident;

import org.apache.camel.CamelContext;
import org.apache.camel.Consumer;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.component.file.FileComponent;
import org.apache.camel.impl.DefaultCamelContext;

/**
 * The webservice we have implemented.
 */
public class ReportIncidentEndpointImpl implements ReportIncidentEndpoint{
	
	private CamelContext camel;
	private ProducerTemplate template;
	
	public ReportIncidentEndpointImpl() throws Exception {
		init(true);
	}
	
	public ReportIncidentEndpointImpl(boolean enableMailConsumer) throws Exception {
		init(enableMailConsumer);
	}
	
	public void init(boolean enableMailConsumer) throws Exception {
	    // create the camel context that is the "heart" of Camel
	    camel = new DefaultCamelContext();
	    
	    // get the ProducerTemplate thst is a Spring'ish xxxTemplate based producer for very
	    // easy sending exchanges to Camel.
	    template = camel.createProducerTemplate();
	    
	    if(enableMailConsumer){
		    // add the event driven consumer that will listen for mail files and process them
		    addMailSendConsumer();
	    }
	 
	    // start Camel
	    camel.start();
	}

	public OutputReportIncident reportIncident(InputReportIncident parameters) {
		String name = parameters.getGivenName() + " " + parameters.getFamilyName();
	    
	    String filename = "mail-incident-" + parameters.getIncidentId() + ".txt";
	    
	    // generate the mail body using velocity template
	    // notice that we just pass in our POJO (= InputReportIncident) that we
	    // got from Apache CXF to Velocity.
	    Object mailBody = template.sendBody("velocity:mailBody.vm", parameters);
	    // Note: the response is a String and can be cast to String if needed
	    
	    template.sendBodyAndHeader("file://target/subfolder", mailBody, FileComponent.HEADER_FILE_NAME, filename);
		
        OutputReportIncident out = new OutputReportIncident();
        out.setCode("OK");
        return out;
	}
	
	private void addMailSendConsumer() throws Exception {
	    // Grab the endpoint where we should consume. Option - the first poll starts after 2 seconds
	    Endpoint endpint = camel.getEndpoint("file://target/subfolder?consumer.initialDelay=2000");
	 
	    // create the event driven consumer
	    // the Processor is the code what should happen when there is an event
	    // (think it as the onMessage method)
	    Consumer consumer = endpint.createConsumer(new Processor() {
	        public void process(Exchange exchange) throws Exception {
	            // get the mail body as a String
	            String mailBody = exchange.getIn().getBody(String.class);
	            sendEmail(mailBody);
	            System.out.println("Email sent");
	        }
	    });
	 
	    // star the consumer, it will listen for files
	    consumer.start();
	}
	
	private void sendEmail(String mailBody){
		// send the email to your mail server
	    String url = "smtp://someone@localhost?password=secret&to=jacksondat@gmail.com";
	    template.sendBodyAndHeader(url, mailBody, "subject", "New incident reported");
	}

	public ProducerTemplate getTemplate() {
		return template;
	}
	
}
